/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * Agency History and Agent (Team) content required on the Welcome/Home page.
 */

function CollectionHeading({ nodeId, nodeType, children }) {
  return (
    <h2 data-node-id={nodeId} data-node-type={nodeType} data-semantic-role="field" data-concept-id="collection-heading" data-content-kind="text" data-content-source="cms" data-required="true">
      {children}
    </h2>
  );
}

export function AgencyIntroduction({ agency }) {
  return (
    <section
      data-node-id={agency.id}
      data-node-type="agency"
      data-semantic-role="entity"
      data-business-priority="critical"
    >
      <h1
        data-node-id={`${agency.id}-trade-name`}
        data-node-type="agency"
        data-semantic-role="field"
        data-concept-id="agency-trade-name"
        data-content-kind="text"
        data-content-source="fixture"
        data-required="true"
      >
        {agency.tradeName}
      </h1>
      <p
        data-node-id={`${agency.id}-mission`}
        data-node-type="agency"
        data-semantic-role="field"
        data-concept-id="agency-mission-statement"
        data-content-kind="text"
        data-content-source="cms"
        data-required="true"
        data-max-length="400"
      >
        {agency.missionStatement}
      </p>
      <p
        data-node-id={`${agency.id}-history`}
        data-node-type="agency"
        data-semantic-role="field"
        data-concept-id="agency-history-narrative"
        data-content-kind="text"
        data-content-source="cms"
        data-required="true"
        data-max-length="600"
      >
        {agency.historyNarrative}
      </p>
      <p
        data-node-id={`${agency.id}-founding-year`}
        data-node-type="agency"
        data-semantic-role="field"
        data-concept-id="agency-founding-year"
        data-content-kind="date"
        data-content-source="fixture"
        data-required="false"
      >
        Operando desde {agency.foundingYear}
      </p>
      <button
        type="button"
        data-node-id="action-navigate-search-from-intro-001"
        data-node-type="agency"
        data-semantic-role="action"
        data-action-id="action-navigate-search-from-intro-001"
        data-action-intent="navigate-search"
        data-content-kind="action-label"
        data-required="false"
      >
        Ver Propiedades
      </button>
    </section>
  );
}

function TeamMemberProfile({ agent }) {
  return (
    <article
      data-node-id={agent.id}
      data-node-type="agent"
      data-semantic-role="entity"
      data-business-priority="high"
      data-ref="agency-001"
      data-rel="belongs-to"
    >
      <img
        src={`/assets/${agent.portraitAssetId}.jpg`}
        alt={`Retrato profesional de ${agent.name}`}
        data-node-id={agent.portraitAssetId}
        data-node-type="media-asset"
        data-semantic-role="field"
        data-asset-id={agent.portraitAssetId}
        data-asset-purpose="agent-portrait"
        data-asset-required="true"
        data-asset-alt-intent="Identifica visualmente a este agente concreto del equipo"
        data-asset-fallback="show-placeholder-avatar"
      />
      <h3
        data-node-id={`${agent.id}-name`}
        data-node-type="agent"
        data-semantic-role="field"
        data-concept-id="agent-name"
        data-content-kind="text"
        data-content-source="fixture"
        data-required="true"
      >
        {agent.name}
      </h3>
      <p
        data-node-id={`${agent.id}-role`}
        data-node-type="agent"
        data-semantic-role="field"
        data-concept-id="agent-role"
        data-content-kind="text"
        data-content-source="fixture"
        data-required="true"
      >
        {agent.role}
      </p>
      <p
        data-node-id={`${agent.id}-bio`}
        data-node-type="agent"
        data-semantic-role="field"
        data-concept-id="agent-biography"
        data-content-kind="text"
        data-content-source="cms"
        data-required="false"
        data-max-length="280"
      >
        {agent.bio}
      </p>
    </article>
  );
}

export function TeamMemberProfileCollection({ agents }) {
  return (
    <section
      data-node-id="team-member-collection-001"
      data-node-type="agent"
      data-semantic-role="collection"
      data-cardinality="2..12"
      data-required="true"
      data-ref="agency-001"
      data-rel="belongs-to"
    >
      <CollectionHeading nodeId="team-member-collection-001-heading" nodeType="agent">
        Nuestro Equipo
      </CollectionHeading>
      {agents.map((agent) => (
        <TeamMemberProfile key={agent.id} agent={agent} />
      ))}
    </section>
  );
}

export { CollectionHeading };
