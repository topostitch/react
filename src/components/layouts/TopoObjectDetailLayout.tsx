import {
  TopoObject,
  TopoObjectContainer,
  TopoProvider,
  apollo11CommandModule,
  demoProvider,
} from "@topostitch/react";

export default function App() {
  const object = apollo11CommandModule;
  const metadata = object.metadata ?? {};

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 32,
        background: "#181818",
        color: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "min(1280px, 100%)",
          margin: "0 auto",
        }}
      >
        <TopoProvider provider={demoProvider}>
          <TopoObjectContainer
            sectionLabel={`${object.title} interactive details`}
            inspectorLabel={`${object.title} information`}
            inspectorTitle={object.title}
            defaultInspectorState="expanded"
            height="700px"
            viewer={
              <TopoObject
                id={object.id}
                view="model"
                renderer="r3f"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                options={{
                  height: "100%",
                  environment: "studio",
                  controls: true,
                }}
              />
            }
          >
            <header>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  opacity: 0.6,
                }}
              >
                Smithsonian Institution
              </p>

              <h1
                style={{
                  margin: "0 0 16px",
                  fontSize: 32,
                  lineHeight: 1.1,
                }}
              >
                {object.title}
              </h1>

              {object.description ? (
                <p style={{ margin: 0, lineHeight: 1.6 }}>
                  {object.description}
                </p>
              ) : null}
            </header>

            <section
              aria-labelledby="object-metadata-heading"
              style={{ marginTop: 32 }}
            >
              <h2
                id="object-metadata-heading"
                style={{ fontSize: 20, marginBottom: 16 }}
              >
                Metadata
              </h2>

              <dl
                style={{
                  display: "grid",
                  gridTemplateColumns: "max-content minmax(0, 1fr)",
                  gap: "12px 16px",
                  margin: 0,
                }}
              >
                {Object.entries(metadata).map(([key, value]) => (
                  <div key={key} style={{ display: "contents" }}>
                    <dt style={{ fontWeight: 700 }}>{key}</dt>

                    <dd
                      style={{
                        margin: 0,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {String(value)}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {object.timeline?.length ? (
              <section
                aria-labelledby="object-timeline-heading"
                style={{ marginTop: 32 }}
              >
                <h2
                  id="object-timeline-heading"
                  style={{ fontSize: 20, marginBottom: 16 }}
                >
                  Timeline
                </h2>

                <ol style={{ margin: 0, paddingLeft: 20 }}>
                  {object.timeline.map((event) => (
                    <li
                      key={event.id ?? event.title}
                      style={{ marginBottom: 20 }}
                    >
                      <article>
                        {event.date ? (
                          <time
                            dateTime={event.date}
                            style={{
                              display: "block",
                              marginBottom: 4,
                              fontSize: 13,
                              opacity: 0.65,
                            }}
                          >
                            {event.date}
                          </time>
                        ) : null}

                        <h3
                          style={{
                            margin: 0,
                            fontSize: 16,
                          }}
                        >
                          {event.title}
                        </h3>

                        {event.description ? (
                          <p
                            style={{
                              margin: "6px 0 0",
                              lineHeight: 1.5,
                            }}
                          >
                            {event.description}
                          </p>
                        ) : null}
                      </article>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
          </TopoObjectContainer>
        </TopoProvider>
      </div>
    </main>
  );
}
