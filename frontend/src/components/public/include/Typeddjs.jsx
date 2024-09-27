import React from 'react'
import Typed from 'typed.js';
function Typeddjs() {
    const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Embroidery', 'Mehndi Design','MakeUp'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 700,
      smartBackspace: true,
      loop: true,
      loopCount: Infinity,
    });
    return () => {
        // Destroy Typed instance during cleanup to stop animation
        typed.destroy();
      };
    }, []);
  
    return (
    //   <div className="App">
        <span ref={el} />
    //   </div>
    );
}

export default Typeddjs

