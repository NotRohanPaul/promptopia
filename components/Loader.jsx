import Image from "next/image"

const Loader = () => {
    return (
        <Image
            src={"/assets/icons/loader.svg"}
            width={100}
            height={100}
            alt="Loader"
        />
    )
}

export default Loader