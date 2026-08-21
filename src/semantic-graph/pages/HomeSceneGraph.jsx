/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * Source order is authoritative for reading sequence, keyboard/focus
 * order, and narrative sequence only. It does not prescribe coordinates,
 * columns, alignment, proximity, size, or visual prominence. Business
 * importance is carried exclusively by data-business-priority, never by
 * position.
 *
 * Home page — Agency History, Agent (Team) profiles, Property Showcase
 * ("Vitrina"), per CLAUDE.md Welcome Page requirements.
 */
import { SiteHeader, SiteFooter } from '../nodes/SiteChrome.jsx';
import { AgencyIntroduction, TeamMemberProfileCollection } from '../nodes/AgencyNodes.jsx';
import { FeaturedListingCollection } from '../nodes/SearchNodes.jsx';
import { agencyFixture, agentFixtures } from '../fixtures.js';
import { listingProperties } from '../propertyCatalog.js';
import '../../styles/agents.css';

export default function HomeSceneGraph() {
  return (
    <div
      data-scene-schema="proptech-semantic-graph"
      data-scene-version="1.0.0"
      data-locale="es-ES"
      data-node-id="home-page-001"
      data-node-type="page"
      data-semantic-role="entity"
    >
      <SiteHeader />
      <main>
        <AgencyIntroduction agency={agencyFixture} />
        <TeamMemberProfileCollection agents={agentFixtures} className="team-collection" />
        <FeaturedListingCollection properties={listingProperties.slice(0, 6)} />
      </main>
      <SiteFooter />
    </div>
  );
}
