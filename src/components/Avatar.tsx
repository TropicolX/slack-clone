interface AvatarProps {
  width: number;
  borderRadius?: number | string;
  fontSize?: number;
  fontWeight?: number | string;
  data: {
    name: string;
    image?: string | null;
  };
}

const Avatar = ({
  borderRadius = '50%',
  fontSize = 16,
  fontWeight = 400,
  width,
  data,
}: AvatarProps) => {
  const { name, image } = data;

  if (image)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        style={{ width, height: width, borderRadius }}
        className="overflow-hidden object-cover"
        src={image}
        alt={name}
      />
    );

  return (
    <div
      style={{
        width,
        borderRadius,
        fontSize: `${fontSize}px`,
        fontWeight,
        backgroundColor: 'rgba(239,225,245,0.25)',
      }}
      className="shrink-0 aspect-square uppercase text-white font-sans-serif font-medium flex items-center justify-center"
    >
      <div className="select-none">{name ? name[0] : ''}</div>
    </div>
  );
};

export default Avatar;
