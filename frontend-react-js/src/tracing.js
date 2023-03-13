// // tracing.js
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { WebTracerProvider, BatchSpanProcessor } from '@opentelemetry/sdk-trace-web';
// import { ZoneContextManager } from '@opentelemetry/context-zone';
// import { Resource }  from '@opentelemetry/resources';
// import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

// const exporter = new OTLPTraceExporter({
//   // url: process.env.OTEL_URL
//   url: "https://4318-jeffr89-awsbootcampcrud-k06olg5hr1d.ws-eu90.gitpod.io:443/v1/traces"
// });
// const provider = new WebTracerProvider({
//   resource: new Resource({
//     [SemanticResourceAttributes.SERVICE_NAME]: 'browser',
//   }),
// });
// provider.addSpanProcessor(new BatchSpanProcessor(exporter));
// provider.register({
//   contextManager: new ZoneContextManager()
// });


import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { W3CTraceContextPropagator } from '@opentelemetry/core'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { Resource } from '@opentelemetry/resources'
import { ZoneContextManager } from '@opentelemetry/context-zone'
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'

export const initInstrumentation = () => {
  const exporter = new OTLPTraceExporter({
    url: `https://4318-jeffr89-awsbootcampcrud-k06olg5hr1d.ws-eu90.gitpod.io:443/v1/traces`,
  })

  const resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'cruddur-frontend',
    application: 'cruddur-frontend',
  })

  const provider = new WebTracerProvider({ resource })
  provider.addSpanProcessor(new BatchSpanProcessor(exporter))

  // Initialize the provider
  provider.register({
    propagator: new W3CTraceContextPropagator(),
    contextManager: new ZoneContextManager(),
  })

  // Registering instrumentations / plugins
  registerInstrumentations({
    instrumentations: [
      new FetchInstrumentation({
        propagateTraceHeaderCorsUrls: [/.+/g], // this is too broad for production
        clearTimingResources: true,
      }),
    ],
  })
}

initInstrumentation()