create sequence account_id_seq;
create sequence currency_id_seq;
create sequence item_id_seq;
create sequence operation_id_seq;
create sequence transfer_id_seq;
create table if not exists currency (
    id bigint default nextval('currency_id_seq'::regclass) not null constraint currency_pkey primary key,
    long_name varchar(50) not null,
    short_name varchar(3) not null constraint uk_r4mwq1i7lgx54qw2uksk79eh3 unique
);
create table if not exists account (
    id bigint default nextval('account_id_seq'::regclass) not null constraint account_pkey primary key,
    amount numeric(10, 2) not null,
    comment text,
    name varchar(50) not null constraint uk_bb9lrmwswqvhcy1y430ki00ir unique,
    currency_id bigint not null constraint fk316pn109iutn6yqoxrqp09cpc references currency
);
create table if not exists item (
    id bigint default nextval('item_id_seq'::regclass) not null constraint item_pkey primary key,
    name varchar(50) not null,
    type integer not null,
    parent_item_id bigint constraint fka3rmlgvinyx0de6jvogft00r8 references item
);
create table if not exists operation (
    id bigint default nextval('operation_id_seq'::regclass) not null constraint operation_pkey primary key,
    amount numeric(10, 2) not null,
    comment text,
    date date not null,
    type integer not null,
    account_id bigint not null constraint fkloy20r01mn4truqqu460w3j9q references account,
    item_id bigint not null constraint fkcd49uxcdcmy8dmfeyfcq9klp4 references item
);
create table if not exists transfer (
    id bigint default nextval('transfer_id_seq'::regclass) not null constraint transfer_pkey primary key,
    amount_from numeric(10, 2) not null,
    amount_to numeric(10, 2) not null,
    comment text,
    date date not null,
    account_from_id bigint not null constraint fkepbgr4ngmhfe3u24xpi7tcrtf references account,
    account_to_id bigint not null constraint fkp18di2te0genks62nwbnj6v31 references account
);
create table "user"
(
	id serial not null
		constraint user_pk
			primary key,
	name varchar not null
);


create unique index user_id_uindex
	on "user" (id);

alter table account
add "user" int;
alter table account
add constraint account_user_id_fk foreign key ("user") references "user";

INSERT INTO public.currency (id, long_name, short_name) VALUES (1, 'rub', 'rub');
INSERT INTO public.currency (id, long_name, short_name) VALUES (2, 'us', 'us');
INSERT INTO public.currency (id, long_name, short_name) VALUES (3, 'eur', 'eur');
