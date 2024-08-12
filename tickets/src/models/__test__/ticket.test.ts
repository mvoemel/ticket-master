import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "user-id",
  });

  // Save the ticket to the database
  await ticket.save();

  // Fetch the ticket twice
  const fetchedTicketOne = await Ticket.findById(ticket.id);
  const fetchedTicketTwo = await Ticket.findById(ticket.id);

  // Make two seperate changes to the tickets we fetched
  fetchedTicketOne!.set({ price: 10 });
  fetchedTicketTwo!.set({ price: 15 });

  // Save the first fetched ticket
  await fetchedTicketOne!.save();

  // Save the second fetched ticket and expect an error
  try {
    await fetchedTicketTwo!.save();
  } catch (err) {
    return;
  }

  throw new Error("Should not reach this point");
});

it("increments the version number when a ticket is updated", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "user-id",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
