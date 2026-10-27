

import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type SquareValue = 'X' | 'O' | null;

type SquareProps = {
  value: SquareValue;
  onSquareClick: () => void;
};

function Square({ value, onSquareClick }: SquareProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        styles.square,
        {
          backgroundColor: colors.square,
          borderColor: colors.border,
        },
      ]}
      onPress={onSquareClick}
      accessibilityRole="button"
      accessibilityLabel={value ? `Square ${value}` : 'Empty square'}
    >
      <Text
        style={[
          styles.squareText,
          { color: value === 'X' ? colors.x : colors.o },
        ]}
      >
        {value}
      </Text>
    </Pressable>
  );
}

type BoardProps = {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (nextSquares: SquareValue[]) => void;
};

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const { colors } = useTheme();
  const winner = calculateWinner(squares);

  function handleClick(i: number) {
    if (squares[i] || winner) {
      return;
    }

    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  let status: string;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <View style={styles.boardContainer}>
      <Text style={[styles.status, { color: colors.text }]}>
        {status}
      </Text>

      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.boardRow}>
          {[0, 1, 2].map((col) => {
            const i = row * 3 + col;

            return (
              <Square
                key={i}
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

function calculateWinner(squares: SquareValue[]): SquareValue {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}

export default function Game() {
  const { colors } = useTheme();

  const [history, setHistory] = useState<SquareValue[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function handlePlay(nextSquares: SquareValue[]) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      nextSquares,
    ];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((_, move) => {
    const description =
      move > 0 ? `Go to move #${move}` : 'Go to game start';

    return (
      <Pressable
        key={move}
        onPress={() => jumpTo(move)}
        style={[
          styles.moveButton,
          {
            backgroundColor:
              currentMove === move
                ? colors.selected
                : colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.moveText,
            {
              color:
                currentMove === move
                  ? colors.primary
                  : colors.text,
              fontWeight: currentMove === move ? 'bold' : 'normal',
            },
          ]}
        >
          {description}
        </Text>
      </Pressable>
    );
  });

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Tic-Tac-Toe
      </Text>

      <Board
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
      />

      <View style={styles.historyContainer}>
        <Text style={[styles.historyTitle, { color: colors.text }]}>
          Move History
        </Text>
        {moves}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  boardContainer: {
    alignItems: 'center',
  },
  status: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  boardRow: {
    flexDirection: 'row',
  },
  square: {
    width: 90,
    height: 90,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  historyContainer: {
    width: '100%',
    maxWidth: 280,
    marginTop: 28,
  },
  historyTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  moveButton: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  moveText: {
    fontSize: 16,
  },
});
