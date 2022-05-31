import {html} from "lit"
import '../components/CottonBaby/category-card.mjs'

export default {
    title: 'App/Category/Card'
}

const Template = () => html`
    <category-card src="https://cottonbaby.ru/images/pictures/i2.jpg"></category-card>`

export const Default = Template.bind({})
