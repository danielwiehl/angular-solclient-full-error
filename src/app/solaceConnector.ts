import {Message, MessageDumpFlag, SessionEvent, SessionEventCode, SolclientFactory, SolclientFactoryProfiles, SolclientFactoryProperties} from 'solclientjs';

export class SolaceConnector {

  constructor() {
    const factoryProperties = new SolclientFactoryProperties();
    factoryProperties.profile = SolclientFactoryProfiles.version10_5;
    SolclientFactory.init(factoryProperties);
  }

  public connect(): void {
    const session = SolclientFactory.createSession({
      url: 'wss://public.messaging.solace.cloud:443',
      vpnName: 'public',
      userName: 'angular',
      password: 'public',
      // @ts-expect-error: typedef(solclientjs): remove when changed 'publisherProperties' to optional
      publisherProperties: undefined,
    });

    session.on(SessionEventCode.UP_NOTICE, (event: SessionEvent) => {
      console.log('>>> on_UP_NOTICE', event);
      onConnected();
    });
    session.on(SessionEventCode.DOWN_ERROR, (event: SessionEvent) => {
      console.log('>>> on_DOWN_ERROR', event);
    });
    session.connect();

    function onConnected(): void {
      session.on(SessionEventCode.MESSAGE, (message: Message) => {
        console.log('>>> on_MESSAGE', message.dump(MessageDumpFlag.MSGDUMP_BRIEF));
      });

      session.subscribe(
        SolclientFactory.createTopicDestination('test'),
        false,
        {},
        undefined!,
      );
    }
  }
}
