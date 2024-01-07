import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Room } from "../models/models";
import { convertKrossDate } from "../utils/utils";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface IRoomRadioListGroup {
  rooms: Room[];
  onRoomIndexSelected: (room: Room) => void;
}

export default function RoomRadioListGroup({
  rooms,
  onRoomIndexSelected,
}: IRoomRadioListGroup) {
  const [selected, setSelected] = useState(rooms[0]);

  useEffect(() => {
    onRoomIndexSelected(rooms[0]);
  }, []);

  return (
    <div>
      <div className="mb-4">
        <label className="text-base font-semibold text-gray-900">
          Scegli una stanza
        </label>
        <p className="text-sm text-gray-500">
          L'utente che hai selezionato ha confermato più di una stanza. Scegli
          una stanza per andare avanti.
        </p>
      </div>

      <RadioGroup
        value={selected}
        onChange={(_room) => {
          setSelected(_room);
          onRoomIndexSelected(_room);
        }}
      >
        <RadioGroup.Label className="sr-only">Privacy setting</RadioGroup.Label>
        <div className="-space-y-px rounded-md bg-white">
          {rooms.map((room, index) => (
            <RadioGroup.Option
              key={index}
              value={room}
              className={({ checked }) =>
                classNames(
                  index === 0 ? "rounded-tl-md rounded-tr-md" : "",
                  index === rooms.length - 1
                    ? "rounded-bl-md rounded-br-md"
                    : "",
                  checked
                    ? "z-10 border-indigo-200 bg-indigo-50"
                    : "border-gray-200",
                  "relative flex cursor-pointer border p-4 focus:outline-none"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span
                    className={classNames(
                      checked
                        ? "bg-indigo-600 border-transparent"
                        : "bg-white border-gray-300",
                      active ? "ring-2 ring-offset-2 ring-indigo-600" : "",
                      "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                    )}
                    aria-hidden="true"
                  >
                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                  </span>
                  <span className="ml-3 flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className={classNames(
                        checked ? "text-indigo-900" : "text-gray-900",
                        "block text-sm font-medium"
                      )}
                    >
                      {room.name_room_type}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className={classNames(
                        checked ? "text-indigo-700" : "text-gray-500",
                        "block text-sm"
                      )}
                    >
                      Arrivo il {convertKrossDate(room.arrival)}, Partenza il{" "}
                      {convertKrossDate(room.departure)}, Tipo di stanza:{" "}
                      {room.name_configuration}
                    </RadioGroup.Description>
                  </span>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
