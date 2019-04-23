import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AddSalesperson from "../components/addSalesperson"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `serverless`, `react`, `fauna`, `netlify`]} />
    <h1>Add a salesperson</h1>

    <AddSalesperson />
    
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
