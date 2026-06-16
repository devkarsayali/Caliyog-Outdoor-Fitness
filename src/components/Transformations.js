import React from "react";
import "../style/Transformations.css";

import t1 from "../assets/t1.png";
import t2 from "../assets/t2.png";
import t3 from "../assets/t3.png";
import t4 from "../assets/t4.png";
import t5 from "../assets/t5.png";
import t6 from "../assets/t6.png";
import t7 from "../assets/t7.png";
import t8 from "../assets/t8.png";
import t9 from "../assets/t9.png";
import t10 from "../assets/t10.png";

function Transformations() {
  const data = [
    { img: t1, title: "Transformation 1" },
    { img: t2, title: "Transformation 2" },
    { img: t3, title: "Transformation 3" },
    { img: t4, title: "Transformation 4" },
    { img: t5, title: "Transformation 5" },
    { img: t6, title: "Transformation 6" },
    { img: t7, title: "Transformation 7" },
    { img: t8, title: "Transformation 8" },
    { img: t9, title: "Transformation 9" },
    { img: t10, title: "Transformation 10" },
  ];

  return (
    <section className="transform-section" id="transformations">
      <div className="transform-heading">
        <h2>Transformations We Did</h2>
        <p>
          Real fitness journeys and amazing results achieved by our members.
        </p>
      </div>

      <div className="transform-grid">
        {data.map((item, index) => (
          <div className="transform-card" key={index}>
            <img src={item.img} alt={item.title} />
            <div className="transform-content">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Transformations;