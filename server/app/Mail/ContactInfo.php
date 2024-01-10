<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactInfo extends Mailable
{
    use Queueable, SerializesModels;
    public $name;
    public $Email;
    public $token;
    public $Subject;
    public $Message;
    /**
     * Create a new message instance.
     */
    public function __construct($name,$Email,$token,$Subject,$Message)
    {
        $this->name=$name;
        $this->Email=$Email;
        $this->token=$token;
        $this->Subject=$Subject;
        $this->Message=$Message;
    }

    /**
     * Get the message envelope.
     */
   public function build(){
    $user['name']=$this->name;
    $user['Email']=$this->Email;
    $user['token']=$this->token;
    $user['Subject']=$this->Subject;
    $user['Message']=$this->Message;
    return $this->from("yoursenderemail@mail.com", "Sender Name")
    ->subject('Contact Information')
    ->view('Account.Contact', ['user' => $user]);
   }
}
