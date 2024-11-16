import { ReactNode, useCallback, useContext, useMemo } from 'react';
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
} from 'stream-chat-react';

import { AppContext } from '../app/client/layout';
import Bold from './icons/Bold';
import BulletedList from './icons/BulletedList';
import Code from './icons/Code';
import CodeBlock from './icons/CodeBlock';
import Emoji from './icons/Emoji';
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
  // Send button
  // Codeblocks *
  // Quotes *
  // Emojis *
  // Mentions *
  // Images
  // Links
  // Files

  const { workspace } = useContext(AppContext);
  const { channel } = useChannelStateContext();
  const { sendMessage } = useChannelActionContext();
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
      case 'link':
        return `[${children}](${formattedNode.url})`;
      default:
        return `${children}`;
    }
  };

  const handleSubmit = () => {
    const text = serializeToMarkdown(editor.children as Descendant[]);
    if (text) {
      sendMessage({
        text,
      });
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
              <Button
                type="mark"
                format="link"
                icon={<Link color="var(--icon-gray)" />}
              />
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
              <div className="separator h-5 w-[1px] mx-1 my-0.5 self-center flex-shrink-0 bg-[#e8e8e821]" />
              <Button
                type="mark"
                format="code"
                icon={<Code color="var(--icon-gray)" />}
              />
              <Button
                type="mark"
                format="code-block"
                icon={<CodeBlock color="var(--icon-gray)" />}
              />
            </div>
          </div>
          {/* Input */}
          <div className="flex self-stretch cursor-text">
            <div className="flex grow text-[14.8px] leading-[1.46668] px-3 py-2">
              <div className="flex-1 min-h-[22px]">
                <Editable
                  renderElement={renderElement as never}
                  renderLeaf={renderLeaf}
                  placeholder={`Mesage #${channelName}`}
                  className="editable outline-none"
                  spellCheck
                  autoFocus
                  onKeyDown={(event) => {
                    for (const hotkey in HOTKEYS) {
                      if (isHotkey(hotkey, event as never)) {
                        event.preventDefault();
                        const mark = HOTKEYS[hotkey];
                        toggleMark(editor, mark);
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
          {/* Composer actions */}
          <div className="flex items-center justify-between pl-1.5 pr-[5px] cursor-text rounded-b-lg h-[40px]">
            <div className="flex item-center">
              <button className="w-7 h-7 p-0.5 m-0.5 flex items-center justify-center rounded-full hover:bg-[#565856]">
                <Plus size={18} color="var(--icon-gray)" />
              </button>
              <Button
                format="none"
                className="rounded hover:bg-[#d1d2d30b] [&_path]:hover:fill-channel-gray"
                icon={<Formatting color="var(--icon-gray)" />}
              />
              <Button
                format="none"
                className="rounded hover:bg-[#d1d2d30b] [&_path]:hover:fill-channel-gray"
                icon={<Emoji color="var(--icon-gray)" />}
              />
              <Button
                format="mention"
                className="rounded hover:bg-[#d1d2d30b] [&_path]:hover:fill-channel-gray"
                icon={<Mentions color="var(--icon-gray)" />}
              />
              <div className="separator h-5 w-[1px] mx-1.5 my-0.5 self-center flex-shrink-0 bg-[#e8e8e821]" />
              <Button
                format="none"
                className="rounded hover:bg-[#d1d2d30b] [&_path]:hover:fill-channel-gray"
                icon={<Video color="var(--icon-gray)" />}
              />
              <Button
                format="none"
                className="rounded hover:bg-[#d1d2d30b] [&_path]:hover:fill-channel-gray"
                icon={<Microphone color="var(--icon-gray)" />}
              />
              <div className="separator h-5 w-[1px] mx-1.5 my-0.5 self-center flex-shrink-0 bg-[#e8e8e821]" />
              <Button
                format="none"
                className="rounded hover:bg-[#d1d2d30b] [&_path]:hover:fill-channel-gray"
                icon={<SlashBox color="var(--icon-gray)" />}
              />
            </div>
            <button onClick={handleSubmit}>Send</button>
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

const Element = ({ attributes, children, element }: ElementProps) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
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
