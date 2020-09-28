import React from "react";
import { Layout } from "antd";

import "./style.css";

const { Header, Footer, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
	return (
		<Layout id="main-div">
			<Header id="top-div">
				Header
			</Header>
			<Content id="content-div">
				Content
			</Content>
			<Sider id="sider-div">
				Sider
			</Sider>
			<Footer id="bottom-div">
				Footer
			</Footer>
		</Layout>
	)
}

export default MainLayout;