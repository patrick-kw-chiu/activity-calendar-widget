export default function Week(props) {
  return (
    <div
      style={{
        height: '10px',
        marginBottom: '4px',
        transform: 'translateY(-2px)',
      }}
    >
      {props.week}
    </div>
  );
}
