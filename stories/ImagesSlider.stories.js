import {html} from "lit"
import '../components/CottonBaby/images-slider.mjs'

export default {
    title: 'App/Images/Slider'
}

const Template = () => html`
    <images-slider>
        <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p4.500x500.jpg" alt="Image">
        <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p3.500x500.jpg" alt="Image">
        <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p2.500x500.jpg" alt="Image">
        <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p5.500x500.jpg" alt="Image">
        <img src="https://cottonbaby.ru/images/cache/thumb/images/pictures/p1.500x500.jpg" alt="Image">
    </images-slider>`

export const Default = Template.bind({})
