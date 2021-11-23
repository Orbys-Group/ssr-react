import React from "react";
import { Link, Route, Switch } from "react-router-dom";

const pages = import.meta.globEager("./pages/*.jsx");

const routes = Object.keys(pages).map((path) => {
	const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1];
	return {
		name,
		path: name === "Home" ? "/" : `/${name.toLowerCase()}`,
		component: pages[path].default,
		exact: name === "Home" ? true : false,
	};
});

export function App() {
	return (
		<>
			<nav>
				<ul>
					{routes.map(({ name, path }) => {
						return (
							<li key={path}>
								<Link to={path}>{name}</Link>
							</li>
						);
					})}
				</ul>
			</nav>
			<Switch>
				{routes.map(({ path, component: RouteComp, exact }) => {
					return (
						<Route key={path} path={path} exact={exact}>
							<RouteComp />
						</Route>
					);
				})}
			</Switch>
			<p>Hola</p>
		</>
	);
}