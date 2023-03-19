const Avatar = ({size, onClick}) => {
    return (
        <img width={size} height={size} onClick={onClick} role="button" className="img-fluid rounded-circle" src="https://s3-alpha-sig.figma.com/img/db1b/75ea/40b7e9908f2fac27098bd04c1c6c618e?Expires=1679875200&Signature=Up0sK5J6x6rqkMKHnfFXGpjAuld10dxzd8lgGB-Rwgpynf-cyqJlIQDzX1sWmHeMIbNVOSa22BQEu8~M3eshqU7PW8o36~6vcUmax4p3dsu7R3S77a~se5LZBkXhEXx-0GGaCNC7JxwMgqak46TjkT-ZlokVAJOiJa3UK~1PxWW8UJ5I0YaGIQvAtjfQKKTGiQ9ZyXbcwy983WwNLS-aZecgOKiJyyzBJ7xyBTt97l2LmwzyUTsbeCjx-~y~hWjLATAvPUvUN0IQ9mrWl5fr2Er6ubANACC~7-ALaAzEVpdJMT~S0WkogEungF~3QYjw7AiFdJ98lGIF0XMAshYyAA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
    );
}

export default Avatar;
