import { FunctionFailure, log } from "@restackio/ai/function";

import { getEntity } from "./getEntity";

export async function initiateConnection({
  entityId,
  appName,
  composioApiKey,
  waitUntilActive,
}: {
  entityId: string;
  appName: string;
  composioApiKey?: string;
  waitUntilActive?: number;
}) {
  try {
    const entity = await getEntity({ composioApiKey, entityId });
    const entityConnections = await entity.getConnections();
    const entityAppConnection = entityConnections.find(
      (connection) => connection.appName === appName
    );

    if (
      entityAppConnection?.status === "ACTIVE" ||
      entityAppConnection?.status === "INITIATED"
    ) {
      return entityAppConnection;
    }

    const connection = await entity.initiateConnection(appName);

    log.info(`Open this URL to authenticate: ${connection.redirectUrl}`, {
      redirectUrl: connection.redirectUrl,
    });

    if (!waitUntilActive) {
      return connection;
    }

    await connection.waitUntilActive(waitUntilActive);
    return connection;
  } catch (error) {
    throw FunctionFailure.nonRetryable(`Error getting entity: ${error}`);
  }
}
