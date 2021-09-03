import React from "react";
import { Link } from "react-router-dom";

// export const Pet = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h2", {}, props.name),
//     React.createElement("h3", {}, props.animal),
//     React.createElement("h3", {}, props.breed)
//   ]);
// };

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = `http://pets-images.dev-apis.com/pets/none.jpg`;
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link id={id} to={`/details/${id}`} className="relative block">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent p-2">
        <h1 className="font-extrabold">{name}</h1>
        <h2>
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
