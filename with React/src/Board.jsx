export default function Board({ board, handleBoardClick }) {
  return (
    <main id="board" onClick={handleBoardClick}>
      {board.map((sq, i) => {
        return (
          <div
            key={i}
            id={i}
            style={
              sq === 1
                ? { backgroundColor: "purple" }
                : sq === -1
                ? { backgroundColor: "orange" }
                : null
            }
            className={sq === null ? "avail" : ""}
          ></div>
        );
      })}
    </main>
  );
}
