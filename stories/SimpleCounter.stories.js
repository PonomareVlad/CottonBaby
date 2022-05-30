import {html} from "lit"
import '../components/simple-counter.mjs'

export default {
    title: 'App/SimpleCounter'
}

const Template = () => html`
    <simple-counter></simple-counter>`

export const Default = Template.bind({})
