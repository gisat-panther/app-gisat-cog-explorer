declare module "@gisatcz/ptr-maps" {
  export class ReactLeafletMap extends React.Component<ReactLeafletMapProps> {}

  interface ReactLeafletMapProps {
    mapKey?: string;
    view?: object;
    backgroundLayer?: object;
  }

  export class DeckGlMap extends React.Component<DeckGlMapProps> {}

  interface DeckGlMapProps {
    mapKey?: string;
    view?: object;
    backgroundLayer?: object;
    layers?: Array;
  }

  export class PresentationMap extends React.Component<
    PresentationMapProps,
    React.ComponentType
  > {}

  interface PresentationMapProps {
    children?: React.ReactNode;
    mapComponent?: React.ComponentType;
    mapKey?: string;
    view?: object;
    layers?: array;
    backgroundLayer?: object;
  }

  export class MapControls extends React.Component<MapControlsProps> {}

  interface MapControlsProps {
    zoomOnly?: boolean;
    levelsBased?: boolean;
  }

  export class MapSet extends React.Component<MapSetProps> {}

  interface MapSetProps {}
}
