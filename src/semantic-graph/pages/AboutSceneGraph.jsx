/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * About page — agency description and the complete student-agent team.
 */
import { SiteHeader, SiteFooter } from '../nodes/SiteChrome.jsx';
import { TeamMemberProfileCollection } from '../nodes/AgencyNodes.jsx';
import { agencyFixture, agentFixtures } from '../fixtures.js';
import '../../styles/about.css';
import '../../styles/agents.css';

export default function AboutSceneGraph() {
  return (
    <div
      data-scene-schema="proptech-semantic-graph"
      data-scene-version="1.0.0"
      data-locale="es-ES"
      data-node-id="about-page-001"
      data-node-type="page"
      data-semantic-role="entity"
    >
      <SiteHeader />
      <main>
        <section
          className="about-agency-introduction"
          data-node-id={`${agencyFixture.id}-about-introduction`}
          data-node-type="agency"
          data-semantic-role="entity"
          data-business-priority="critical"
        >
          <h1
            data-node-id="about-page-heading-001"
            data-node-type="agency"
            data-semantic-role="field"
            data-concept-id="about-page-heading"
            data-content-kind="text"
            data-content-source="fixture"
            data-required="true"
          >
            Sobre Nosotros
          </h1>
          <p
            data-node-id={`${agencyFixture.id}-about-description`}
            data-node-type="agency"
            data-semantic-role="field"
            data-concept-id="agency-description"
            data-content-kind="text"
            data-content-source="fixture"
            data-required="true"
            data-max-length="400"
          >
            {agencyFixture.missionStatement}
          </p>
          <p
            data-node-id={`${agencyFixture.id}-about-history`}
            data-node-type="agency"
            data-semantic-role="field"
            data-concept-id="agency-history-narrative"
            data-content-kind="text"
            data-content-source="fixture"
            data-required="true"
            data-max-length="600"
          >
            {agencyFixture.historyNarrative}
          </p>
          <p
            data-node-id={`${agencyFixture.id}-about-founding-year`}
            data-node-type="agency"
            data-semantic-role="field"
            data-concept-id="agency-founding-year"
            data-content-kind="date"
            data-content-source="fixture"
            data-required="false"
          >
            Operando desde {agencyFixture.foundingYear}
          </p>
        </section>
        <TeamMemberProfileCollection agents={agentFixtures} className="team-collection team-collection--about" />
      </main>
      <SiteFooter />
    </div>
  );
}