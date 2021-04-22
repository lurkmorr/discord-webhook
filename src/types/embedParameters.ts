import Author from "../classes/embed/author";
import Thumbnail from "../classes/embed/thumbnail";
import Field from "../classes/embed/field";
import Image from "../classes/embed/image";
import Footer from "../classes/embed/footer";
import Color from "../classes/embed/color";
import Url from "../classes/embed/url";

type EmbedParameters = {
    color? : string | number | Color
    title? : string
    url? : string | Url
    author? : Author
    description? : string
    thumbnail? : Thumbnail
    fields? : Field[]
    image? : Image
    timestamp? : Date
    footer? : Footer
}

export default EmbedParameters
