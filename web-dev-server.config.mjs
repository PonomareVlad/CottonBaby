import {storybookPlugin} from '@ponomarevlad/dev-server-storybook'

export default {
    plugins: [storybookPlugin({type: 'web-components', mainExt: 'cjs'})]
}
