import styled from 'styled-components';

interface HexagonProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Hexagon = styled.div.attrs<HexagonProps>(({ x, y, width, height }) => ({
  style: {
    transform: `translate(${x}px, ${y}px)`,
    width,
    height,
  },
}))<HexagonProps>`
  position: absolute;
  background-color: rgba(1, 1, 1, 0.8);
  clip-path: polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%);
`;

export default Hexagon;