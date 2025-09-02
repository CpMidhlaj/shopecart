import{Carousel, Image, } from "react-bootstrap"
function Homecarosal(){
    return(
        <Carousel className="mt-5">
        <Carousel.Item interval={1000}>
          <Image src="./Image/projector.jpg"/>
        </Carousel.Item>
        <Carousel.Item interval={500}>
        <Image src="./Image/shaadi.jpg"/>
        </Carousel.Item>
        <Carousel.Item>
        <Image src="./Image/bfs.jpg"/>
        </Carousel.Item>
      </Carousel>
    )
}
export default Homecarosal