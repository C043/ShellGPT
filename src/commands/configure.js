import { fileURLToPath } from "url"
import { join, resolve } from "path"
import jsonfile from "jsonfile"

const file = join(resolve(fileURLToPath(import.meta.url), "../../.."), "configuration.json")

const configure = (key) => {
    const obj = {
        key: key
    }
    try {
        jsonfile.writeFile(file, obj)
    } catch (e) {
        console.log(e)
    }
}

export default configure
