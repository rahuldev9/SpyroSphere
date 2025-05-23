import React from 'react';

const loaderKeyframes = `
@keyframes loader {
  33% {
    inset: -5.6px;
    transform: rotate(0deg);
  }
  66% {
    inset: -5.6px;
    transform: rotate(90deg);
  }
  100% {
    inset: 0;
    transform: rotate(90deg);
  }
}
`;

const styles = {
  wrapper: {
    position: 'relative',
    width: '22.4px',
    height: '22.4px',
    color: '#554cb5',
    background: 'radial-gradient(5.6px, currentColor 94%, #0000)',
  },
  before: {
    content: "''",
    position: 'absolute',
    inset: '0',
    borderRadius: '50%',
    background: `
      radial-gradient(5.04px at bottom right, #0000 94%, currentColor) top left,
      radial-gradient(5.04px at bottom left,  #0000 94%, currentColor) top right,
      radial-gradient(5.04px at top right,    #0000 94%, currentColor) bottom left,
      radial-gradient(5.04px at top left,     #0000 94%, currentColor) bottom right
    `,
    backgroundSize: '11.2px 11.2px',
    backgroundRepeat: 'no-repeat',
    animation: 'loader 1.5s infinite cubic-bezier(0.3, 1, 0, 1)',
  }
};

const Loader = () => {
  return (
    <>
      <style>{loaderKeyframes}</style>
      <div style={styles.wrapper}>
        <div style={styles.before}></div>
      </div>
    </>
  );
};

export default Loader;
