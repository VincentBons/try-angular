import { createServiceFactory, SpectatorService } from "@ngneat/spectator/jest";
import { Data } from "./data";

describe("Data", () => {
  let spectator: SpectatorService<Data>;
  const createService = createServiceFactory(Data);

  beforeEach(() => (spectator = createService()));

  it("should expose clients list", () => {
    expect(Array.isArray(spectator.service.clients)).toBe(true);
    expect(spectator.service.clients.length).toBe(15);
  });

  it("should expose carers list", () => {
    expect(Array.isArray(spectator.service.carers)).toBe(true);
    expect(spectator.service.carers.length).toBe(5);
  });

  it("should expose care moments list", () => {
    expect(Array.isArray(spectator.service.careMoments)).toBe(true);
    expect(spectator.service.careMoments.length).toBe(18);
  });

  it("should expose contacts list", () => {
    expect(Array.isArray(spectator.service.contacts)).toBe(true);
    expect(spectator.service.contacts.length).toBe(13);
  });

  it("should expose getClientById", () => {
    const client = spectator.service.getClientById("client-1");
    expect(client).toBeTruthy();
    expect(client?.firstNames).toBe("Bea");
  });

  it("should expose getContactById", () => {
    const contact = spectator.service.getContactById("contact-1");
    expect(contact).toBeTruthy();
    expect(contact?.firstNames).toBe("Kees");
  });

  it("should expose getCarerById", () => {
    const carer = spectator.service.getCarerById("carer-1");
    expect(carer).toBeTruthy();
    expect(carer?.firstNames).toBe("Elisabeth");
  });

  it("should expose careMomentsForClient", () => {
    const careMoments = spectator.service.careMomentsForClient("client-1");
    expect(Array.isArray(careMoments)).toBe(true);
    expect(careMoments.length).toBe(4);
  });

  it("should add a careMoment with addCareMoment", () => {
    const initialLength = spectator.service.careMoments.length;
    spectator.service.addCareMoment({
      date: "2026-12-31",
      time: "14:30",
      client: "client-1",
      careType: "Bloeddruk meten",
      carer: "carer-1"
    });
    expect(spectator.service.careMoments.length).toBe(initialLength + 1);
    const newCareMoment = spectator.service.careMoments[initialLength];
    expect(newCareMoment).toBeTruthy();
    expect(newCareMoment.client).toBe("client-1");
    expect(newCareMoment.careType).toBe("Bloeddruk meten");
    expect(newCareMoment.carer).toBe("carer-1");
    expect(newCareMoment.date).toBe("2026-12-31");
    expect(newCareMoment.time).toBe("14:30");
  });

  it("should not add a careMoment when not all required data is there", () => {
    const initialLength = spectator.service.careMoments.length;
    spectator.service.addCareMoment({
      date: "2026-12-31",
      time: "14:30",
      client: "",
      careType: "Bloeddruk meten",
      carer: "carer-1"
    });
    expect(spectator.service.careMoments.length).toBe(initialLength);
  });

  it("should add a careMoment when strange characters are used", () => {
    const initialLength = spectator.service.careMoments.length;
    spectator.service.addCareMoment({
      date: "2026-12-31",
      time: "14:30",
      client: "client-1",
      careType: "Blôeddrük méten",
      carer: "carer-1"
    });
    expect(spectator.service.careMoments.length).toBe(initialLength + 1);
    const newCareMoment = spectator.service.careMoments[initialLength];
    expect(newCareMoment).toBeTruthy();
    expect(newCareMoment.careType).toBe("Blôeddrük méten");
  });
});
