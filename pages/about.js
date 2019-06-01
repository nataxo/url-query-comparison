import { Component } from 'react'
import Link from 'next/link'
import Header from '../components/header'

class AboutPage extends Component {
  render() {
    return (
      <main>
        <Header />
        <section>
          <Link href="/">
            <a>Go to Home</a>
          </Link>
        </section>
      </main>
    )
  }
}

export default AboutPage
