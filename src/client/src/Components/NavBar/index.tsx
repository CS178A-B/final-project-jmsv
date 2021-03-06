import React, { useContext } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import {
    authenticatedRoutes,
    unauthenticatedRoutes,
    studentRoutes,
    facultyMemberRoutes,
    generalRoutes,
    IRoute,
} from 'routes';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import SignOutButton from 'Domains/Accounts/SignOutButton';
import { AuthContext } from 'Contexts/AuthContext';

const NavItems = ({ routes }: { routes: IRoute[] }) => {
    return (
        <>
            {routes.map(
                (route, key) =>
                    !route.hide && (
                        <NavLink
                            key={key}
                            style={{
                                marginRight: 20,
                                textDecoration: 'none',
                            }}
                            to={route.path}
                        >
                            <Button
                                style={{ color: '#ffff' }}
                                startIcon={route.icon}
                            >
                                {route.name}
                            </Button>
                        </NavLink>
                    )
            )}
        </>
    );
};

function NavBar() {
    const { isAuthenticated, user } = useContext(AuthContext);
    const userRoutes = () => {
        switch (user?.role) {
            case 'student':
                return studentRoutes;
            case 'facultyMember':
                return facultyMemberRoutes;
            default:
                return [];
        }
    };
    return (
        <AppBar position='sticky'>
            <ToolBar>
                {<NavItems routes={generalRoutes}></NavItems>}
                {isAuthenticated ? (
                    <NavItems
                        routes={[...authenticatedRoutes, ...userRoutes()]}
                    />
                ) : (
                    <NavItems routes={unauthenticatedRoutes} />
                )}
                {isAuthenticated && <SignOutButton />}
            </ToolBar>
        </AppBar>
    );
}
export default withRouter(NavBar);
