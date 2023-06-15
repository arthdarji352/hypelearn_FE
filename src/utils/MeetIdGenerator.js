const makeid = (length) => {
    var result = ""
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  const ID = () => {
    const str = makeid(10)
    const n = 4
    var ret = []
    var i
    var len

    for (i = 0, len = str.length; i < len; i += n) {
      ret.push(str.substr(i, n))
    }

    return ret
  }

  const GeneratedID = ID().join("-")

  export default GeneratedID
