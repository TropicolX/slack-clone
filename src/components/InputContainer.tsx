import {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  RenderLeafProps,
  RenderElementProps,
} from 'slate-react';
import {
  Editor,
  Transforms,
  createEditor,
  Descendant as SlateDescendant,
  Element as SlateElement,
  Text,
} from 'slate';
import isHotkey from 'is-hotkey';
import { withHistory } from 'slate-history';
import {
  useChannelActionContext,
  useChannelStateContext,
  useMessageInputContext,
} from 'stream-chat-react';

import { AppContext } from '../app/client/layout';
import Avatar from './Avatar';
import Bold from './icons/Bold';
import BulletedList from './icons/BulletedList';
import Close from './icons/Close';
import Code from './icons/Code';
import CodeBlock from './icons/CodeBlock';
import Emoji from './icons/Emoji';
import EmojiPicker from './EmojiPicker';
import Formatting from './icons/Formatting';
import Italic from './icons/Italic';
import Link from './icons/Link';
import Mentions from './icons/Mentions';
import Microphone from './icons/Microphone';
import NumberedList from './icons/NumberedList';
import Plus from './icons/Plus';
import Quote from './icons/Quote';
import Strikethrough from './icons/Strikethrough';
import SlashBox from './icons/SlashBox';
import Video from './icons/Video';
import Send from './icons/Send';
import CaretDown from './icons/CaretDown';

type Descendant = Omit<SlateDescendant, 'children'> & {
  children: (
    | {
        text: string;
      }
    | {
        text: string;
        bold: boolean;
      }
    | {
        text: string;
        italic: boolean;
      }
    | {
        text: string;
        code: boolean;
      }
    | {
        text: string;
        underline: boolean;
      }
    | {
        text: string;
        strikethrough: boolean;
      }
  )[];
  url?: string;
  type: string;
};

type FileInfo = {
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
};

const HOTKEYS: {
  [key: string]: string;
} = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const InputContainer = () => {
  const { workspace } = useContext(AppContext);
  const { channel } = useChannelStateContext();
  const { sendMessage } = useChannelActionContext();
  const { uploadNewFiles, attachments, removeAttachments, cooldownRemaining } =
    useMessageInputContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [filesInfo, setFilesInfo] = useState<FileInfo[]>([]);

  const renderElement = useCallback(
    (props: ElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const channelName = useMemo(() => {
    const currentChannel = workspace.channels.find((c) => c.id === channel.id);
    return currentChannel?.name || '';
  }, [workspace.channels, channel.id]);

  const serializeToMarkdown = (nodes: Descendant[]) => {
    return nodes.map((n) => serializeNode(n)).join('\n');
  };

  const serializeNode = (
    node: Descendant | Descendant['children'],
    parentType: string | null = null,
    indentation: string = ''
  ) => {
    if (Text.isText(node)) {
      let text = node.text;
      const formattedNode = node as Text & {
        bold?: boolean;
        italic?: boolean;
        code?: boolean;
        strikethrough?: boolean;
      };
      if (formattedNode.bold) text = `**${text}**`;
      if (formattedNode.italic) text = `*${text}*`;
      if (formattedNode.strikethrough) text = `~~${text}~~`;
      if (formattedNode.code) text = `\`${text}\``;

      return text;
    }

    const formattedNode = node as Descendant;
    const children: string = formattedNode.children
      .map((n) => serializeNode(n as never, formattedNode.type, indentation))
      .join('');

    switch (formattedNode.type) {
      case 'paragraph':
        return `${children}`;
      case 'block-quote':
        return `> ${children}`;
      case 'bulleted-list':
      case 'numbered-list':
        return `${children}`;
      case 'list-item': {
        const prefix = parentType === 'numbered-list' ? '1. ' : '- ';
        const indentedPrefix = `${indentation}${prefix}`;
        return `${indentedPrefix}${children}\n`;
      }
      case 'code-block':
        return `\`\`\`\n${children}\n\`\`\``;
      default:
        return `${children}`;
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      uploadNewFiles(files);
      const newFilesInfo: FileInfo[] = [];
      filesArray.forEach((file) => {
        const fileData: FileInfo = {
          name: file.name,
          size: file.size,
          type: file.type,
        };

        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFilesInfo((prevFiles) => [
              ...prevFiles,
              { ...fileData, previewUrl: reader.result as string },
            ]);
          };
          reader.readAsDataURL(file);
        } else {
          newFilesInfo.push(fileData);
        }
      });
      setFilesInfo((prevFiles) => [...prevFiles, ...newFilesInfo]);
      e.currentTarget.value = '';
    }
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveFile = (index: number) => {
    setFilesInfo((prevFiles) => {
      const newFiles = prevFiles.filter((_, i) => i !== index);
      return newFiles;
    });

    removeAttachments([attachments[index].localMetadata.id]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const clipboardItems = event.clipboardData.items;
    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
      if (item.type.indexOf('image') !== -1) {
        const imageFile = item.getAsFile();
        if (imageFile) {
          const fileData: FileInfo = {
            name: imageFile.name,
            size: imageFile.size,
            type: imageFile.type,
          };
          const reader = new FileReader();
          reader.onloadend = () => {
            uploadNewFiles([imageFile]);
            setFilesInfo((prevFiles) => [
              ...prevFiles,
              { ...fileData, previewUrl: reader.result as string },
            ]);
          };
          reader.readAsDataURL(imageFile);
        }
        event.preventDefault();
      }
    }
  };

  const handleSubmit = async () => {
    const text = serializeToMarkdown(editor.children as Descendant[]);
    if (text || attachments.length > 0) {
      sendMessage({
        text,
        attachments,
      });
      setFilesInfo([]);
      removeAttachments(attachments.map((a) => a.localMetadata.id));

      const point = { path: [0, 0], offset: 0 };
      editor.selection = { anchor: point, focus: point };
      editor.history = { redos: [], undos: [] };
      editor.children = initialValue;
    }
  };

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <div className="input-container relative rounded-md border border-[#565856] has-[:focus]:border-[#868686] bg-[#22252a]">
        <div className="[&>.formatting]:has-[:focus]:opacity-100 [&>.formatting]:has-[:focus]:select-text flex flex-col">
          {/* Formatting */}
          <div className="formatting opacity-30 flex p-1 w-full rounded-t-lg cursor-text">
            <div className="flex grow h-[30px]">
              <Button
                type="mark"
                format="bold"
                icon={<Bold color="var(--icon-gray)" />}
              />
              <Button
                type="mark"
                format="italic"
                icon={<Italic color="var(--icon-gray)" />}
              />
              <Button
                type="mark"
                format="strikethrough"
                icon={<Strikethrough color="var(--icon-gray)" />}
              />
              <div className="separator h-5 w-[1px] mx-1 my-0.5 self-center flex-shrink-0 bg-[#e8e8e821]" />
              <Button format="none" icon={<Link color="var(--icon-gray)" />} />
              <div className="separator h-5 w-[1px] mx-1 my-0.5 self-center flex-shrink-0 bg-[#e8e8e821]" />
              <Button
                type="block"
                format="numbered-list"
                icon={<NumberedList color="var(--icon-gray)" />}
              />
              <Button
                type="block"
                format="bulleted-list"
                icon={<BulletedList color="var(--icon-gray)" />}
              />
              <div className="separator h-5 w-[1px] mx-1 my-0.5 self-center flex-shrink-0 bg-[#e8e8e821]" />
              <Button
                type="block"
                format="block-quote"
                icon={<Quote color="var(--icon-gray)" />}
              />
              <div className="hidden sm:block separator h-5 w-[1px] mx-1 my-0.5 self-center flex-shrink-0 bg-[#e8e8e821]" />
              <Button
                type="mark"
                format="code"
                icon={<Code color="var(--icon-gray)" />}
                className="hidden sm:inline-flex"
              />
              <Button
                type="block"
                format="code-block"
                icon={<CodeBlock color="var(--icon-gray)" />}
                className="hidden sm:inline-flex"
              />
            </div>
          </div>
          {/* Input */}
          <div className="flex self-stretch cursor-text">
            <div className="flex grow text-[14.8px] leading-[1.46668] px-3 py-2">
              <div
                style={{
                  scrollbarWidth: 'none',
                }}
                className="flex-1 min-h-[22px] scroll- overflow-y-scroll max-h-[calc(60svh-80px)]"
              >
                <Editable
                  renderElement={renderElement as never}
                  renderLeaf={renderLeaf}
                  placeholder={`Mesage #${channelName}`}
                  className="editable outline-none"
                  onPaste={handlePaste}
                  spellCheck
                  autoFocus
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      if (event.shiftKey) {
                        return;
                      } else {
                        event.preventDefault();
                        handleSubmit();
                      }
                    }
                    if (isHotkey('mod+a', event)) {
                      event.preventDefault();
                      Transforms.select(editor, []);
                      return;
                    }
                    for (const hotkey in HOTKEYS) {
                      if (isHotkey(hotkey, event as never)) {
                        event.preventDefault();
                        const mark = HOTKEYS[hotkey];
                        toggleMark(editor, mark);
                      }
                    }
                  }}
                />
                {/* File preview section */}
                {filesInfo.length > 0 && (
                  <div className="relative mt-4 flex items-center gap-3 flex-wrap">
                    {filesInfo.map((file, index) => (
                      <div key={index} className="group relative max-w-[234px]">
                        {file.previewUrl ? (
                          <div className="relative w-[62px] h-[62px] grow shrink-0 cursor-pointer">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={file.previewUrl}
                              alt={`File Preview ${index}`}
                              className="w-full h-full object-cover rounded-xl border-[#d6d6d621] border"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center rounded-xl gap-3 p-3 border border-[#d6d6d621] bg-[#1a1d21]">
                            <Avatar
                              width={32}
                              borderRadius={8}
                              data={{ name: file.type }}
                            />
                            <div className="flex flex-col gap-0.5">
                              <p className="text-sm text-[#d1d2d3] break-all whitespace-break-spaces line-clamp-1 mr-2">
                                {file.name}
                              </p>
                              <p className="text-[13px] text-[#ababad] break-all whitespace-break-spaces line-clamp-1">
                                {file.type}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="group-hover:opacity-100 opacity-0 absolute -top-2.5 -right-2.5 flex items-center justify-center w-[22px] h-[22px] rounded-full bg-black">
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="w-[18px] h-[18px] flex items-center justify-center rounded-full bg-gray-300"
                          >
                            <Close size={14} color="black" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Composer actions */}
          <div className="flex items-center justify-between pl-1.5 pr-[5px] cursor-text rounded-b-lg h-[40px]">
            <div className="flex item-center">
              <button
                onClick={handleUploadButtonClick}
                className="w-7 h-7 p-0.5 m-0.5 flex items-center justify-center rounded-full hover:bg-[#565856]"
              >
                <Plus size={18} color="var(--icon-gray)" />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileInputChange}
                />
              </button>
              <Button
                format="none"
                className="rounded hover:bg-[#d1d2d30b] [&_path]:hover:fill-channel-gray"
                icon={<Formatting color="var(--icon-gray)" />}
              />
              <EmojiPicker
                buttonClassName="w-7 h-7 p-0.5 m-0.5 inline-flex items-center justify-center rounded [&_path]:fill-icon-gray hover:bg-[#d1d2d30b] [&_path]:hover:fill-channel-gray"
                ButtonIconComponent={Emoji}
                wrapperClassName="relative"
                onEmojiSelect={(e) => {
                  Transforms.insertText(editor, e.native);
                }}
              />
              <Button
                format="mention"
                className="rounded hover:bg-[#d1d2d30b] [&_path]:hover:fill-channel-gray"
                icon={<Mentions color="var(--icon-gray)" />}
              />
              <div className="hidden sm:block separator h-5 w-[1px] mx-1.5 my-0.5 self-center flex-shrink-0 bg-[#e8e8e821]" />
              <Button
                format="none"
                className="hidden sm:inline-flex rounded hover:bg-[#d1d2d30b] [&_path]:hover:fill-channel-gray"
                icon={<Video color="var(--icon-gray)" />}
              />
              <Button
                format="none"
                className="hidden sm:inline-flex rounded hover:bg-[#d1d2d30b] [&_path]:hover:fill-channel-gray"
                icon={<Microphone color="var(--icon-gray)" />}
              />
              <div className="hidden sm:block separator h-5 w-[1px] mx-1.5 my-0.5 self-center flex-shrink-0 bg-[#e8e8e821]" />
              <Button
                format="none"
                className="hidden sm:inline-flex rounded hover:bg-[#d1d2d30b] [&_path]:hover:fill-channel-gray"
                icon={<SlashBox color="var(--icon-gray)" />}
              />
            </div>
            <div className="flex items-center mr-0.5 ml-2 rounded h-7 border border-[#797c814d] text-[#e8e8e8b3] bg-[#007a5a] border-[#007a5a]">
              <button
                onClick={handleSubmit}
                disabled={!!cooldownRemaining}
                className="px-2 h-[28px] rounded-l hover:bg-[#148567]"
              >
                <Send
                  color={
                    !Boolean(cooldownRemaining)
                      ? 'var(--primary)'
                      : 'var(--icon-gray)'
                  }
                  size={16}
                  filled
                />
              </button>
              <div className="cursor-pointer h-5 w-[1px] bg-[#ffffff80]" />
              <button className="w-[22px] flex items-center justify-center h-[26px] rounded-r hover:bg-[#148567]">
                <CaretDown
                  size={16}
                  color={
                    !Boolean(cooldownRemaining)
                      ? 'var(--primary)'
                      : 'var(--icon-gray)'
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Slate>
  );
};

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes((n as Descendant).type),
    split: true,
  });
  const newProperties: Partial<Descendant> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: Editor, format: string, blockType = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as never)[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor) as null;
  return marks ? marks[format] : false;
};

type ElementProps = RenderElementProps & {
  element: {
    type: string;
    align?: CanvasTextAlign;
  };
};

const Element = (props: ElementProps) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'code-block':
      return (
        <div {...attributes} className="code-block">
          {children}
        </div>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

interface LeafProps extends RenderLeafProps {
  leaf: {
    bold?: boolean;
    code?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    text: string;
  };
}

const Leaf = ({ attributes, children, leaf }: LeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>;
  }

  return <span {...attributes}>{children}</span>;
};

interface ButtonProps {
  active?: boolean;
  className?: string;
  icon: ReactNode;
  format: string;
  type?: 'mark' | 'block';
}

const Button = ({ className, format, icon, type }: ButtonProps) => {
  const editor = useSlate();
  const isActive =
    type === 'block'
      ? isBlockActive(editor, format)
      : isMarkActive(editor, format);

  return (
    <button
      className={clsx(
        'w-7 h-7 p-0.5 m-0.5 inline-flex items-center justify-center rounded',
        isActive ? 'bg-[#414347] hover:bg-[#4b4c51]' : 'bg-transparent',
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        if (type === 'block') {
          toggleBlock(editor, format);
        } else if (type === 'mark') {
          toggleMark(editor, format);
        }
      }}
    >
      {icon}
    </button>
  );
};

export default InputContainer;
