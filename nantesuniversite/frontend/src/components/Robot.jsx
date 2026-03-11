const robotFigure =
  'https://www.figma.com/api/mcp/asset/cf52df61-4847-4c05-885a-107648560480';

export default function Robot() {
  return (
    <div
      className="absolute"
      style={{ left: 480, top: 844, width: 89, height: 205 }}
    >
      <img
        src={robotFigure}
        alt="Figure IA"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
