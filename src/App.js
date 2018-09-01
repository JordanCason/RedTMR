
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bountysListAction } from './redux_actions/action_bountysList'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './Comp_Nav/Nav'
import SubNav from './Comp_Nav/SubNav'
import Footer from './Comp_Footer/Footer'
import Home from './Comp_Home/Home'
import CreateBounty from './Comp_CreateBounty/CreateBounty'
import DisplayBounty from './Comp_DisplayBounty/DisplayBounty'
import SubmitVuln from './Comp_SubmitVuln/SubmitVuln'
import HackerWorkflow from './Comp_SubmitVuln/Comp_HackerWorkflow/HackerWorkflow'
import OwnerWorkflow from './Comp_SubmitVuln/Comp_OwnerWorkflow/OwnerWorkflow'
import testFunk from './Comp_TestFunk/testFunk'
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/quick-start.md
// https://www.youtube.com/watch?v=3B588JwyT18 A good youtube routing video

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterTable: this.loadBountys() // calling loadBountys here because we want them to load first on page refresh.. \
        // may be able to lode previouse state in redux after refresh in futrue
        }
    }

    loadBountys() {
        if (!this.props.bountysList.bountysLoaded) { // Only load bountys if they have not been rendered alrady
            return (this.props.bountysListAction())
        }
    }

  render = () => {
      return (
          <Router basename="/ipns/QmRnw4LMRat6UAqsQwftuJkh3Wrbdc9hpQBaWYPfFu4oL8">
              <AppDiv>
                  <Navigation />
                  <Route exact path="/" render={(props) => <Home filterTable={this.state.filterTable} {...props} /> }/>
                  <Route path="/CreateBounty" component={CreateBounty}/>
                  <Route path="/Bounty/:id" component={SubNav}/>
                  <Route exact path="/Bounty/:id/submit" component={SubmitVuln}/>
                  <Route exact path="/Bounty/:id" component={DisplayBounty}/>
                  <Route exact path="/Bounty/:id/ownerWorkflow" component={OwnerWorkflow}/>
                  <Route exact path="/Bounty/:id/hackerWorkflow" component={HackerWorkflow}/>
                  <Route exact path="/testFunk" component={testFunk}/>
                  <Footer />
              </AppDiv>
          </Router>
      )
  }
}

// from the constructer we are seting the filterTable to a promise to pass into the home component \
// this is because the redux action doesent actualy return a promise to bountyList that we can call .then on \
// and we need that promise functionality in the home componet to set the state when it returns \
// I couldent get the bountysList to cause a rerender when the data was actualy returnd

const mapStateToProps = state => ({
    bountysList: state.bountysList
})

const mapActionsToProps = {
    bountysListAction
}

export default connect(mapStateToProps, mapActionsToProps)(App)

const AppDiv = styled.div`
    height: auto;
`

// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>
//           Rendering with React
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>
//           Components
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>
//         <div>{console.log(match.url)}</div>
//           Props v. State
//         </Link>
//       </li>
//     </ul>
//
//     <Route path={`${match.path}/:topicId`} component={Topic}/>
//     <Route exact path={match.path} render={() => (
//       <h3>Please select a topic.</h3>
//     )}/>
//   </div>
// )
