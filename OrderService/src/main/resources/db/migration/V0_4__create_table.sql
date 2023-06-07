create table orders
(
    id        bigint default nextval('orders_seq') not null,
    uuid_user uuid                                 not null,
    id_book   bigint                               not null
);