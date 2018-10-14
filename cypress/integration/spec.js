/// <reference types="cypress" />
const React = require('react')
const ReactDOM = require('react-dom')

it('injects dynamic React component and it works', () => {
  cy.visit('index.html')
  cy.contains('#app', 'Some text')

  // React component, you can use JSX
  const Welcome = (props) =>
    <p onClick={props.onClick}>Hello, {props.name}</p>

  const onClick = cy.stub().as('click')
  cy.get('#app').then(el$ => {
    const welcomeGleb = <Welcome name="Gleb" onClick={onClick} />
    ReactDOM.render(welcomeGleb, el$[0])
  })

  cy.log('Testing injected element by clicking on it')
  // notice that we are using text that is created by `welcomeGleb` element
  cy.contains('Hello, Gleb').click().click()
  cy.get('@click').should('have.been.calledTwice')
})
