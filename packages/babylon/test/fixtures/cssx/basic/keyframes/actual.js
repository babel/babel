cssx(
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    12.5% {
      transform: translateX(-40px) rotateY(-5deg);
    }
    37.5% {
      transform: translateX(20px) rotateY(4deg);
    }
    62.5% {
      transform: translateX(-10px) rotateY(-2deg);
    }
    87.5% {
      transform: translateX(4px) rotateY(1deg);
    }
    100% {
      transform: translateX(0);
    }
    from {
      a: 1;
    }
    to {
      b: 2;
    }
  }
)