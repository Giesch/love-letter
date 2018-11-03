FROM scratch

COPY target/x86_64-unknown-linux-musl/release/love-letter /love-letter
COPY love-letter-ui/dist love-letter-ui/dist

EXPOSE 3000

ENTRYPOINT ["/love-letter"]