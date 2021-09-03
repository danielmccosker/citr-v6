import { Component, ReactNode, MouseEvent } from "react";

interface IProps {
  images: string[];
}

class Carousel extends Component<IProps> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick(event: MouseEvent<HTMLElement>): void {
    if (!(event.target instanceof HTMLElement)) return;

    this.setState({
      active: Number(event.target.dataset.index),
    });
  }

  render(): ReactNode {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal-thumbnail"
              data-index={index}
              onClick={(e) => this.handleIndexClick(e)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
