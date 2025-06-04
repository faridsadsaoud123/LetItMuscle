"use client";
import styled from "styled-components";

const ArrowDownIcon = () => {
  return (
    <StyledSvg
      width="104"
      height="93"
      viewBox="0 0 104 93"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M59 7C59 3.13401 55.866 0 52 0C48.134 0 45 3.13401 45 7L59 7ZM47.0503 90.9497C49.7839 93.6834 54.2161 93.6834 56.9497 90.9497L101.497 46.402C104.231 43.6684 104.231 39.2362 101.497 36.5025C98.7638 33.7689 94.3317 33.7689 91.598 36.5025L52 76.1005L12.402 36.5025C9.66835 33.7689 5.2362 33.7689 2.50253 36.5025C-0.231144 39.2362 -0.231144 43.6683 2.50253 46.402L47.0503 90.9497ZM45 7L45 86H59L59 7L45 7Z"
        fill="#EA7E38"
      />
    </StyledSvg>
  );
};

const StyledSvg = styled.svg`
  width: 104px;
  height: 93px;
  color: #ea7e38;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }

  @media (max-width: 991px) {
    width: 80px;
    height: 71px;
  }

  @media (max-width: 640px) {
    width: 60px;
    height: 53px;
  }
`;

export default ArrowDownIcon;
