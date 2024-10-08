import { NavLink } from "react-router-dom"
function MainNavigation() {
    return (
        <header  >
            <nav>
                <ul >
                    <li>
                        <NavLink to={'/'}  >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/addProduct'}    >Add Product</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/categories'}  >Categories</NavLink>
                    </li>

                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;