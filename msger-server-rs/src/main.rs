use std::io::{Read, Write};
use std::net::{Shutdown, TcpListener, TcpStream};
use std::str::from_utf8;
use std::thread;

fn handle_client(mut client: TcpStream, clients: Vec<TcpStream>) -> std::io::Result<()> {
	loop {
		let mut data = [0; 1024];
		match client.read(&mut data) {
			Ok(_) => {
				println!(
					"from {} : {}",
					client.peer_addr()?,
					from_utf8(&data).unwrap()
				);

				for mut c in &clients {
					c.write(&data);
				}
			}
			Err(_) => {
				println!("error, terminating connection with {}", client.peer_addr()?);
				break;
			}
		}
	}
	client.shutdown(Shutdown::Both)?;
	Ok(())
}

fn main() -> std::io::Result<()> {
	let mut clients = Vec::new();
	let server = TcpListener::bind("localhost:1234")?;
	println!("server listening on {} ...", server.local_addr()?);

	for client in server.incoming() {
		match client {
			Ok(client) => {
				println!("new connection : {}", client.peer_addr()?);
				clients.push(client.clone());
				thread::spawn(|| handle_client(client, clients));
			}
			Err(e) => println!("error : {}", e),
		}
	}

	Ok(())
}
