export default ({body}, {send}) =>
    console.debug(body) || send(body)
