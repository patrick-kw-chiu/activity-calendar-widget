type Props = {
  month: string;
  right: string;
};

export default function Month(props: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        width: '32px',
        top: '-16px',
        right: props.right,
      }}
    >
      {props.month}
    </div>
  );
}
