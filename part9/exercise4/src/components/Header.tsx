interface Name {
    name: string;
}

const Header = ( props: Name) => {
    return <h1>{props.name}</h1>
}

export default Header