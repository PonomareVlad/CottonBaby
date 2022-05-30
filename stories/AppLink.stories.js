import {html} from "lit"
import '../components/app-link.mjs'

export default {
    title: 'App/Link'
}

const Template = () => html`
    <app-link href="/" title="Link"></app-link>`

export const Default = Template.bind({})
