import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  get client(): Stan {
    if (!this._client) {
      throw new Error("NATS client not initialized");
    }
    return this._client;
  }

  connect(clusterID: string, clientID: string, url: string): Promise<void> {
    this._client = nats.connect(clusterID, clientID, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });
      this.client.on("error", (err) => {
        console.error("Error connecting to NATS", err);
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
